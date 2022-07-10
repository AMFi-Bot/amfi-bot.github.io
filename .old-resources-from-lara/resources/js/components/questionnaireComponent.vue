<template>
  <div class="questionnaire_blur" id="questionnaire_blur">
    <div class="questionnaire_wrapper" id="questionnaire_wrapper">
      <div class="questionnaire_errors" id="questionnaire_errors">
        <div
          class="questionnaire_error"
          v-for="questionnaire_error in questionnaire_errors"
          v-bind:key="questionnaire_error"
        >
          {{ questionnaire_error }}
        </div>
      </div>
      <div class="questionnaire_successes" id="questionnaire_successes">
        <div
          class="questionnaire_success"
          v-for="questionnaire_success in questionnaire_successes"
          v-bind:key="questionnaire_success"
        >
          {{ questionnaire_success }}
        </div>
      </div>

      <div class="questionnaire" id="questionnaire">
        <h2 class="questionnaire-title">
          {{ $t("Need additional information") }}
        </h2>
        <div
          class="questionnaire-form"
          v-for="question in questions"
          v-bind:key="question"
          v-bind:question_step="question.step"
          v-bind:class="
            question.step == question_step ? 'current_question' : 'hidden'
          "
        >
          <div class="question_step" v-if="questions.length != 1">
            <label
              v-for="i in questions.length"
              v-bind:key="i"
              v-bind:class="
                i == question.step + 1 ? 'qstep-active' : 'qstep-nonactive'
              "
            >
            </label>
          </div>
          <div class="form-body-wrapper">
            <input type="hidden" name="_token" v-bind:value="csrf" />

            <!-- Text -->
            <div
              class="form-text"
              v-if="question.text"
              v-html="question.text"
            ></div>

            <!-- Inputs -->
            <div
              class="form-input"
              v-for="input in question.inputs"
              v-bind:key="input"
            >
              <label class="form-name">{{ input["iname"] }}</label>
              <label class="form-desc">{{ input["idesc"] }}</label>
              <div class="input-wrapper">
                <input
                  v-bind:type="input.text"
                  v-bind:name="input.name"
                  v-bind:aria-label="input.aria - label"
                  v-bind:maxlength="input.maxlength"
                  v-bind:value="input.value"
                  v-bind:required="input.required"
                />
              </div>
            </div>

            <div class="questionnaire_next next-wrapper" v-on:click="qnext">
              <label
                class="questionnaire_next_text"
                v-bind:class="qnext_loading ? 'disp_none' : ''"
              >
                {{ $t("Next") }}
              </label>
              <div
                class="questionnaire_next_loader little-loader"
                v-bind:class="qnext_loading ? '' : 'disp_none'"
              ></div>
            </div>
            <a href="/about-questionnaire" class="what_is_this link">{{
              $t("What is this?")
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env es6 */

export default {
  props: ["questionnaire", "email"],
  mounted() {
    console.log("Questionnaire is mounted!");
  },
  data() {
    const questionTypes = {
      email: {
        text: false,
        inputs: [
          {
            iname: "E-mail",
            idesc: "Please enter your e-mail",
            type: "email",
            name: "email",
            "aria-label": "E-mail",
            maxlength: 255,
            value: "",
            validate: "required email",
          },
        ],
        next_button: {
          ajax_req: {
            method: "POST",
            url: "/auth/email",
            data: {
              email: "$[input:email]",
            },
            headers: {
              "Content-type": "application/json",
            },
            dataType: "application/json",
          },
          onclick_todo: "send",
        },
      },
      verify_email: {
        text: `Please verify your email. We have sent 
            message on ${
              this.email ? this.email : "it"
            }<br><br> Dont get message?
            <a class="link" 
            href=javascript:resend_email_verification_notification()
            >Click to resend</a>`,
        next_button: {
          ajax_req: {
            method: "GET",
            url: "/check_email_verify",
          },
          onclick_todo: "send",
        },
      },
    };

    const quests = this.questionnaire.split(":");
    let questions = [];
    questions = [];

    for (let i = 0; i < quests.length; i++) {
      if (questionTypes[quests[i]]) {
        const qpush = questionTypes[quests[i]];
        qpush.step = i;
        questions.push(qpush);
      }
    }

    return {
      questions,
      questionnaire_errors: [],
      questionnaire_successes: [],
      csrf: document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
      question_step: 0,
      qnext_loading: false,
    };
  },
  methods: {
    qnext(event) {
      this.qnext_loading = true;
      const th = this;
      /**
       * Questionnaire error
       *
       */
      class QuestionnaireError extends Error {
        /**
         * Questionnaire error
         *
         * @param {string} message
         *
         */
        constructor(message) {
          super(message);
          this.name = "QuestionnaireError";
          this.message = message;

          th.questionnaire_errors.push(this.name + ": " + message);
          th.qnext_loading = false;
        }
      }

      const question = this.questions[this.question_step];

      // const buttonElem = event.target;

      // this.qnext_loading= true;

      if (question.next_button.ajax_req) {
        const axios = require("axios").default;

        const ajaxOpts = question.next_button.ajax_req;
        const data = ajaxOpts.data;

        const form = event.target.parentElement;
        const inputs = [];
        for (const formChild of form.childNodes) {
          if (
            formChild.classList &&
            formChild.classList.contains("form-input")
          ) {
            for (const formInput of formChild.childNodes) {
              if (
                formInput.classList &&
                formInput.classList.contains("input-wrapper")
              ) {
                inputs.push(formInput.childNodes[0]);
              }
            }
          }
        }

        if (ajaxOpts.data && typeof data == "object") {
          for (const [key, value] of Object.entries(data)) {
            if (/^(\$\[).+(\])$/.test(value)) {
              let pdata = value.split("$[")[1].split("]")[0].split(":");
              if (pdata[0] == "input") {
                for (const input of inputs) {
                  if (input.name == pdata[1]) {
                    pdata = input.value;

                    for (const questionInput of question.inputs) {
                      if (questionInput.name == input.name) {
                        validate(pdata, questionInput.validate);
                      }
                    }

                    ajaxOpts.data[key] = pdata;
                  }
                }
              }
            }
          }
        }

        axios
          .request(ajaxOpts)
          .then((response) => {
            console.log(response);

            done();
          })
          .catch((err) => {
            console.error(err);
            throw new QuestionnaireError(`Oops something went wrong: 
            ${JSON.stringify(err.message)}`);
          });
      }

      /**
       * Check questionnaire to additional quests
       *
       */
      function done() {
        if (th.question_step == th.questions.length - 1) {
          // umount component

          console.log("Everything is done!");

          th.qnext_loading = false;
          // remove the element from the DOM
          th.$el.parentNode.removeChild(th.$el);
        } else {
          // go to next step
          th.qnext_loading = false;
          th.question_step++;
        }
      }

      /**
       *
       * @param {any} value A value to validate
       * @param {string} type The type of value
       *
       */
      function validate(value, type) {
        const types = type.split(" ");

        for (const type of types) {
          if (type == "required") {
            if (value) {
              continue;
            } else {
              throw new QuestionnaireError(
                "value is empty but marked as required"
              );
            }
          } else if (type == "email") {
            if (
              // eslint-disable-next-line max-len
              /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/.test(
                value
              )
            ) {
              continue;
            } else {
              throw new QuestionnaireError("Value does not seem as email");
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="sass">
</style>

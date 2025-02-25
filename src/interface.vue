<script lang="ts">
import { defineComponent } from "vue";
import { ref, onMounted, onUnmounted } from "vue";

const OBSERVABLE_SAVE_BUTTON_CONTAINER_SELECTOR =
  "#app header .actions .action-buttons";
const OBSERVED_SAVE_BUTTON_SELECTOR = `[data-icon="check"]`;
const SAVE_BUTTON_SELECTOR = `${OBSERVABLE_SAVE_BUTTON_CONTAINER_SELECTOR} button:has([data-icon="check"])`;
const MENU_ACTIVATOR_SELECTOR = `div.v-menu > div.v-menu-activator > span.v-icon.has-click`;
const OBSERVABLE_SAVE_AND_STAY_BUTTON_CONTAINER_SELECTOR = "#menu-outlet";
const SAVE_AND_STAY_BUTTON_SELECTOR = `${OBSERVABLE_SAVE_AND_STAY_BUTTON_CONTAINER_SELECTOR} ul.v-list > li.v-list-item.link.clickable > div.v-list-item-icon > span.v-icon > i[data-icon='check']`;
const SAVE_AND_STAY_BUTTON_ID = "custom_save_and_stay_button";

export default defineComponent({
  setup(props, { emit }) {
    let newSaveAndStayButton;
    let saveButtonObserver;
    let saveAndStayButtonObserver;

    onMounted(() => {
      // if the dialog is open, do not add the button
      if (document.querySelector("#dialog-outlet *")) {
        return;
      }

      // check if the custom button already exists
      newSaveAndStayButton = document.querySelector(
        `#${SAVE_AND_STAY_BUTTON_ID}`
      );
      if (newSaveAndStayButton) {
        return;
      }

      saveButtonObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const isSaveButton =
            mutation.target.querySelector('[data-icon="check"]') !== null;

          if (isSaveButton) {
            const disabled = mutation.target.hasAttribute("disabled");

            if (newSaveAndStayButton) {
              if (disabled) {
                newSaveAndStayButton.setAttribute("disabled", "disabled");
              } else {
                newSaveAndStayButton.removeAttribute("disabled");
              }

              newSaveAndStayButton.style.marginLeft = disabled ? "10px" : "0px";
            }
          }
        });
      });

      saveAndStayButtonObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
          let element = document.querySelector(SAVE_AND_STAY_BUTTON_SELECTOR);

          if (element) {
            window.customSaveNStayFunction = () => {
              element.click();
            };

            if (window.customSaveNStayRequested) {
              window.customSaveNStayFunction();
              window.customSaveNStayRequested = false;
            }
          }
        }
      });

      // observe the original save button to enable/disable the save and stay button
      saveButtonObserver.observe(
        document.querySelector(OBSERVABLE_SAVE_BUTTON_CONTAINER_SELECTOR),
        {
          subtree: true,
          attributeFilter: ["disabled"],
        }
      );

      // observe the menu outlet to find the save and stay button
      saveAndStayButtonObserver.observe(
        document.querySelector("#menu-outlet"),
        {
          childList: true,
          subtree: true,
        }
      );

      // find the original save button
      const saveButton = document.querySelector(SAVE_BUTTON_SELECTOR);

      if (!newSaveAndStayButton && saveButton) {
        // deep clone the button
        newSaveAndStayButton = saveButton.cloneNode(true);
        // append after the original
        saveButton.parentNode.appendChild(newSaveAndStayButton);
        // customize the icon
        newSaveAndStayButton
          .querySelector("i")
          .setAttribute("data-icon", "save");
        newSaveAndStayButton.style.marginLeft = "10px";
        newSaveAndStayButton.style.cursor = "pointer";
        newSaveAndStayButton.id = SAVE_AND_STAY_BUTTON_ID;

        newSaveAndStayButton.addEventListener("click", () => {
          // find the menu activator where the hidden save and stay button is located
          const menuActivator = document.querySelector(MENU_ACTIVATOR_SELECTOR);

          if (menuActivator) {
            // open the menu
            menuActivator.click();
          }

          // set the flag to trigger the save and stay function (to avoid saving if the user opens the menu)
          window.customSaveNStayRequested = true;
        });
      }
    });

    onUnmounted(() => {
      if (saveButtonObserver) saveButtonObserver.disconnect();
      if (saveAndStayButtonObserver) saveAndStayButtonObserver.disconnect();
    });

    return {};
  },
});
</script>

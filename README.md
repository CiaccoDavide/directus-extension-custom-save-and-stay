# Custom Save and Stay Button for Directus

This interface adds a custom save and stay button avoiding the need to menu dive.

It's a simple (and still hacky) workaround that doesn't rely on keyboard shortcuts.

Just add this custom field to your collection and you're good to go.

![Add the custom hidden field to your collection](https://raw.githubusercontent.com/CiaccoDavide/directus-extension-custom-save-and-stay/refs/heads/main/screenshots/0_add_hidden_field_to_collection.png)

![Save and stay](https://raw.githubusercontent.com/CiaccoDavide/directus-extension-custom-save-and-stay/refs/heads/main/screenshots/1_save_and_stay.png)

## Why is this needed?

Currently there's an [open issue](https://github.com/directus/directus/issues/22883) that suggests making "save and stay" the default behaviour for the save button. That issue was marked to be resolved in a next main release of Directus, but that tag has been removed almost one year ago.

I think the best way this feature could be implemented is by making it a general project setting overridable by a user preference setting, so that the user can choose between "save and close" and "save and stay" as the default behaviour for the save button. But until that happens, this is a simple workaround.

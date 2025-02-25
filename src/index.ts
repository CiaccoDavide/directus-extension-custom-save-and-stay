import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'custom-save-and-stay',
	name: 'Custom Save and Stay',
	icon: 'save',
	description: 'This interface adds a custom save and stay button avoiding the need to menu dive.',
	component: InterfaceComponent,
	hideLabel: true,
	options: null,
	types: ['string'],
	autoKey: true,
});

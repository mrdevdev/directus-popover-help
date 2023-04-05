import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';


export default defineInterface({
	id: 'popover-help',
	name: 'Popover Help',
	icon: 'box',
	description: 'Popover Help Section',
	component: InterfaceComponent,
	hideLabel: true,
	hideLoader: true,
	types: ['alias'],
	localTypes: ['group'],
	group: 'group',
	options: (context) => [
		{
			field: 'layout',
			name: '$t:layout_setup',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				default_value: 'modal',
				options: {
					choices: [
						{ text: '$t:interfaces.user.modes.modal', value: 'modal' },
						{ text: '$t:sidebar', value: 'sidebar' },
					],
				},
			},
			schema: {
				default_value: 'modal',
			},
		},
		{
			field: 'title',
			type: 'string',
			name: '$t:title'
		},
		{
			field: 'image',
			type: 'string',
			name: '$t:image'
		},
		{
			field: 'headerIcon',
			name: '$t:interfaces.group-detail.header_icon',
			type: 'string',
			meta: {
				interface: 'select-icon',
				width: 'half',
			},
		},
		{
			field: 'headerColor',
			name: '$t:interfaces.group-detail.header_color',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				default_value: '',
				options: {
					choices: [
						{ text: '$t:primary', value: 'primary' },
						{ text: '$t:normal', value: 'secondary' },
						{ text: '$t:info', value: 'info' },
						{ text: '$t:success', value: 'success' },
						{ text: '$t:warning', value: 'warning' },
						{ text: '$t:danger', value: 'danger' },
					],
				},
			},
			schema: {
				default_value: '',
			},
		},
	],
});

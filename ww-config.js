export default {
    editor: {
        label: {
            en: 'Countdown Timer',
        },
        icon: 'clock',
        customSettingsPropertiesOrder: [
            'targetDate',
            'endMessage',
            ['hideDays', 'hideHours', 'hideMinutes', 'hideSeconds'],
            ['labelDays', 'labelHours', 'labelMinutes', 'labelSeconds'],
        ],
        customStylePropertiesOrder: [
            'digitTypography',
            'labelTypography',
            'blockBackground',
            'blockBorderRadius',
            'blockPadding',
            'gap', 
        ],
    },
    states: ['finished'],
    triggerEvents: [
        {
            name: 'finish',
            label: { en: 'On Finish' },
            event: null,
            default: true,
        },
    ],
    properties: {
        targetDate: {
            label: { en: 'Target date' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
        },
        endMessage: {
            label: { en: 'End message' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: { en: "Time's up!" },
            multilang: true,
        },
        hideDays: {
            label: { en: 'Hide days' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        hideHours: {
            label: { en: 'Hide hours' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        hideMinutes: {
            label: { en: 'Hide minutes' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        hideSeconds: {
            label: { en: 'Hide seconds' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
        },
        labelDays: {
            label: { en: 'Days label' },
            type: 'Text',
            section: 'settings',
            multilang: true,
            defaultValue: { en: 'days' },
        },
        labelHours: {
            label: { en: 'Hours label' },
            type: 'Text',
            section: 'settings',
            multilang: true,
            defaultValue: { en: 'hours' },
        },
        labelMinutes: {
            label: { en: 'Minutes label' },
            type: 'Text',
            section: 'settings',
            multilang: true,
            defaultValue: { en: 'mins' },
        },
        labelSeconds: {
            label: { en: 'Seconds label' },
            type: 'Text',
            section: 'settings',
            multilang: true,
            defaultValue: { en: 'sec' },
        },
        digitTypography: {
            label: { en: 'Digits' },
            type: 'Typography',
            options: {
                features: 'font,size,color,weight',
            },
            defaultValue: {
                fontSize: '24px',
                fontWeight: 'bold',
            },
        },
        labelTypography: {
            label: { en: 'Labels' },
            type: 'Typography',
            options: {
                features: 'font,size,color,weight',
            },
            defaultValue: {
                fontSize: '16px',
            },
        },
        blockBackground: {
            label: { en: 'Block background' },
            type: 'Color',
            bindable: true,
            defaultValue: '#F0F0F0',
        },
        blockBorderRadius: {
            label: { en: 'Block border radius' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            defaultValue: '4px',
        },
        blockPadding: {
            label: { en: 'Block padding' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            responsive: true,
            defaultValue: '16px',
        },
        gap: {
            label: { en: 'Gap' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            defaultValue: '12px',
            responsive: true,
        },
    },
};
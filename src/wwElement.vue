<template>
    <wwSimpleLayout class="ww-countdown">
        <div v-if="isFinished" class="countdown-end-message">
            <wwText :text="content.endMessage"></wwText>
        </div>
        <div class="temp" :style="tempStyle" v-else>
            <div v-if="!content.hideDays" class="countdown-block" :style="blockStyle">
                <span class="digit" :style="digitStyle">{{ displayDays }}</span>
                <span class="label" :style="labelStyle">{{ labelDaysText }}</span>
            </div>
            <div v-if="!content.hideHours" class="countdown-block" :style="blockStyle">
                <span class="digit" :style="digitStyle">{{ displayHours }}</span>
                <span class="label" :style="labelStyle">{{ labelHoursText }}</span>
            </div>
            <div v-if="!content.hideMinutes" class="countdown-block" :style="blockStyle">
                <span class="digit" :style="digitStyle">{{ displayMinutes }}</span>
                <span class="label" :style="labelStyle">{{ labelMinutesText }}</span>
            </div>
            <div v-if="!content.hideSeconds" class="countdown-block" :style="blockStyle">
                <span class="digit" :style="digitStyle">{{ displaySeconds }}</span>
                <span class="label" :style="labelStyle">{{ labelSecondsText }}</span>
            </div>
        </div>
    </wwSimpleLayout>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event', 'add-state', 'remove-state'],
    setup(props, { emit }) {
        const days = ref(0);
        const hours = ref(0);
        const minutes = ref(0);
        const seconds = ref(0);
        const isFinished = ref(false);
        let interval = null;

        const updateCountdown = () => {
            const target = new Date(props.content.targetDate).getTime();
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                days.value = 0;
                hours.value = 0;
                minutes.value = 0;
                seconds.value = 0;
                isFinished.value = true;
                emit('trigger-event', { name: 'finish' });
                clearInterval(interval);
                return;
            }

            isFinished.value = false;
            days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
            hours.value = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            seconds.value = Math.floor((difference % (1000 * 60)) / 1000);
        };

        const start = () => {
            clearInterval(interval);
            updateCountdown();
            interval = setInterval(updateCountdown, 1000);
        };

        onMounted(start);
        onUnmounted(() => clearInterval(interval));

        watch(() => props.content.targetDate, start);

        watch(
            isFinished,
            (value) => {
                if (value) {
                    emit('add-state', 'finished');
                } else {
                    emit('remove-state', 'finished');
                }
            },
            { immediate: true }
        );
        
        const blockStyle = computed(() => ({
            backgroundColor: props.content.blockBackground,
            borderRadius: props.content.blockBorderRadius,
            padding: props.content.blockPadding,
        }));

        const digitStyle = computed(() => {
            return props.content.digitTypography || {};
        });

        const labelStyle = computed(() => {
            return props.content.labelTypography || {};
        });
        
        const tempStyle = computed(() => ({
            gap: props.content.gap,
        }));
        
        const displayDays = computed(() => String(days.value).padStart(2, '0'));
        const displayHours = computed(() => String(hours.value).padStart(2, '0'));
        const displayMinutes = computed(() => String(minutes.value).padStart(2, '0'));
        const displaySeconds = computed(() => String(seconds.value).padStart(2, '0'));

        const labelDaysText = computed(() => wwLib.wwLang.getText(props.content.labelDays));
        const labelHoursText = computed(() => wwLib.wwLang.getText(props.content.labelHours));
        const labelMinutesText = computed(() => wwLib.wwLang.getText(props.content.labelMinutes));
        const labelSecondsText = computed(() => wwLib.wwLang.getText(props.content.labelSeconds));

        return {
            isFinished,
            blockStyle,
            digitStyle,
            labelStyle,
            tempStyle,
            displayDays,
            displayHours,
            displayMinutes,
            displaySeconds,
            labelDaysText,
            labelHoursText,
            labelMinutesText,
            labelSecondsText,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-countdown {
    .temp{
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
    }
    .countdown-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
    }

    .digit {
        display: block;
    }

    .label {
        display: block;
    }
    
    .countdown-end-message {
        width: 100%;
        text-align: center;
    }
}
</style>
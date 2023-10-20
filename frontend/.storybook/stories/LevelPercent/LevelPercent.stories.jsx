import { LevelPercent } from "./LevelPercent";

export default {
    title: 'LevelPercent',
    component: LevelPercent,

    args: {
        level: '06',
        percent: 60,
    },

    argTypes: {
        level: {
            control: {type: 'text'},
        },
        percent: {
            control: {type: 'number'},
        },
    },
};

const Template = (args) => <LevelPercent {...args} />

export const Level660 = Template.bind({});
Level660.args = {
    level: '06',
    percent: 60,
}

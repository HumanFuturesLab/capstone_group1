import { LevelCircle } from "../components/LevelCircle";

export default {
    title: 'LevelCircle',
    component: LevelCircle,

    args: {
        level: '06',
        bgColor: '#ed712e'
    },

    argTypes: {
        level: {
            control: {type: 'text'},
        },
        bgColor: {
            control: {type: 'text'},
        },
    },
};

const Template = (args) => <LevelCircle {...args} />

export const Level6 = Template.bind({});
Level6.args = {
    level: '06',
    bgColor: '#ed712e'
}

export const Level5 = Template.bind({});
Level5.args = {
    level: '05',
    bgColor: '#573087',
};
import { WeekProgress } from "../components/WeekProgress";

export default {
    title: "WeekProgress",
    component: WeekProgress,

    args: {
        weekCoins: 7000,
    },

    argTypes: {
        weekCoins: {
            control: {type: 'number'},
        },
    },

};

const Template = (args) => <WeekProgress {...args}/>

export const Progress7000 = Template.bind({});
Progress7000.args= {
    weekCoins: 7000,
};
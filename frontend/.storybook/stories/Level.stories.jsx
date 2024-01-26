import { Level } from "../components/Level";

export default {
    title: "Level",
    component: Level,
    args: {
        level: '06',
    },
    argTypes: {
        level: {
            control: {type: "text"},
        },
    },
};

const Template = (args) => <Level {...args}/>

export const Default = Template.bind({});
Default.args = {
    level: '06',
};
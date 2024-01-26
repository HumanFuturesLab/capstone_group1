import {WeekProgress, Props} from '../components/WeekProgress';
import {Story} from '@storybook/react-native';

export default {
  title: 'WeekProgress',
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

const Template: Story<Props> = (args: Props) => <WeekProgress {...args} />;

export const Progress7000: Story<Props> = Template.bind({});
Progress7000.args = {
  weekCoins: '7000',
};

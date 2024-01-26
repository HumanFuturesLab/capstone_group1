import {Level, Props} from '../components/Level';
import {Story} from '@storybook/react-native';

export default {
  title: 'Level',
  component: Level,
  args: {
    level: '06',
  },
  argTypes: {
    level: {
      control: {type: 'text'},
    },
  },
};

const Template: Story<Props> = (args: Props) => <Level {...args} />;

export const Default: Story<Props> = Template.bind({});
Default.args = {
  level: '06',
};

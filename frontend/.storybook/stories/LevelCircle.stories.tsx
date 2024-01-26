import {LevelCircle, Props} from '../components/LevelCircle';
import {Story} from '@storybook/react-native';

export default {
  title: 'LevelCircle',
  component: LevelCircle,

  argTypes: {
    level: {
      control: {type: 'text'},
    },
    bgColor: {
      control: 'color',
    },
  },
};

const Template: Story<Props> = (args: Props) => <LevelCircle {...args} />;

export const Level6: Story<Props> = Template.bind({});
Level6.args = {
  level: '06',
  bgColor: '#ed712e',
};
export const Level60: Story<Props> = Template.bind({});
Level60.args = {
  level: '60',
  bgColor: '#ed712e',
};
export const Level600: Story<Props> = Template.bind({});
Level600.args = {
  level: '600',
  bgColor: '#e244e',
};

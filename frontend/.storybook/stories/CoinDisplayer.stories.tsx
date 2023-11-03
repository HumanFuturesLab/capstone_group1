import {CoinDisplayer, Props} from '../components/CoinDisplayer';
import {Story} from '@storybook/react-native';

export default {
  title: 'CoinDisplayer',
  component: CoinDisplayer,

  args: {
    numberOfCoins: 0,
  },
  argTypes: {
    numberOfCoins: {
      control: {type: 'number'},
    },
  },
};

const Template: Story<Props> = (args: Props) => <CoinDisplayer {...args} />;

export const ZeroCoins = Template.bind({});
ZeroCoins.args = {
  numberOfCoins: 0,
};

export const TenCoins = Template.bind({});
TenCoins.args = {
  numberOfCoins: 10,
};

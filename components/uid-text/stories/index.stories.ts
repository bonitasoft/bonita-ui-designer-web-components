import { html, TemplateResult } from 'lit';
import '../src/uid-text.js';

export default {
  title: 'UidText',
  component: 'uid-text',
  argTypes: {
    label: { control: 'text' },
    labelHidden: { control: 'boolean' },
    text: { control: 'text' },
    labelPosition: {
      options: ['top', 'left'],
      control: 'radio',
    },
    labelWidth: { control: 'number' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label?: string;
  labelHidden?: boolean;
  text?: string;
  labelPosition?: string;
  labelWidth?: number;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  label = 'default',
  labelHidden = false,
  text = 'Lorem Ipsum is simply dummy text of the printing ' +
    "and typesetting industry. Lorem Ipsum has been the industry's *" +
    'standard dummy text ever since the 1500s, when an unknown printer ' +
    'took a galley of type and scrambled it to make a type specimen book. ' +
    'It has survived not only five centuries, but also the leap into electronic ' +
    'typesetting, remaining essentially unchanged. It was popularised in the 1960s' +
    ' with the release of Letraset sheets containing Lorem Ipsum passages, ' +
    'and more recently with desktop publishing software like Aldus PageMaker ' +
    'including versions of Lorem Ipsum.',
  labelPosition = 'top',
  labelWidth,
  slot,
}: ArgTypes) => html`
  <uid-text
    label=${label}
    text=${text}
    label-position=${labelPosition}
    label-width=${labelWidth}
    ${getLabelHidden(labelHidden)}
  >
    ${slot}
  </uid-text>
`;

export const Regular = Template.bind({});

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'My custom label',
  labelPosition: 'left',
  labelWidth: 6,
};

export const CustomValue = Template.bind({});
CustomValue.args = {
  text: 'new value',
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};

function getLabelHidden(labelHidden: boolean) {
  if (!labelHidden) {
    return html``;
  }
  return html`label-hidden`;
}

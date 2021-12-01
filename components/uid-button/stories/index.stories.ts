import { html, TemplateResult } from 'lit';
import '../src/uid-button.js';
import { ifDefined } from 'lit-html/directives/if-defined.js'; // eslint-disable-line

export default {
  title: 'UidButton',
  component: 'uid-button',
  argTypes: {
    id: { control: 'text' },
    disabled: { control: 'boolean' },
    alignment: {
      options: ['left', 'center', 'right'],
      control: 'radio',
    },
    label: { control: 'text' },
    action: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  id?: string;
  disabled?: string;
  alignment?: string;
  label?: string;
  action?: string;
}

const Template: Story<ArgTypes> = ({
  id,
  disabled,
  alignment,
  label,
  action,
}: ArgTypes) => html`
  <uid-button
    id=${ifDefined(id)}
    ?disabled=${ifDefined(disabled)}
    alignment=${ifDefined(alignment)}
    label=${ifDefined(label)}
    action=${ifDefined(action)}
  >
  </uid-button>
`;

export const Regular = Template.bind({});

export const AlignRight = Template.bind({});
AlignRight.args = {
  alignment: 'right',
};

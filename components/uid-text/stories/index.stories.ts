import { html, TemplateResult } from 'lit';
import '../src/uid-text.js';
import { ifDefined } from 'lit-html/directives/if-defined.js'; // eslint-disable-line

export default {
  title: 'UidText',
  component: 'uid-text',
  argTypes: {
    alignment: {
      options: ['left', 'center', 'right'],
      control: 'radio',
    },
    allowHtml: { control: 'boolean' },
    id: { control: 'text' },
    label: { control: 'text' },
    labelHidden: { control: 'boolean' },
    labelPosition: {
      options: ['top', 'left'],
      control: 'radio',
    },
    labelWidth: { control: 'number' },
    lang: {
      options: ['en', 'es-ES', 'fr', 'ja', 'pt-BR'],
      control: 'radio',
    },
    text: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  lang?: string;
  alignment?: boolean;
  allowHtml?: boolean;
  id?: string;
  label?: string;
  labelHidden?: boolean;
  text?: string;
  labelPosition?: string;
  labelWidth?: number;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  lang,
  id,
  label,
  labelHidden,
  text = 'Lorem Ipsum is simply dummy text of the printing ' +
    "and typesetting industry. Lorem Ipsum has been the industry's *" +
    'standard dummy text ever since the 1500s, when an unknown printer ' +
    'took a galley of type and scrambled it to make a type specimen book. ' +
    'It has survived not only five centuries, but also the leap into electronic ' +
    'typesetting, remaining essentially unchanged. It was popularised in the 1960s' +
    ' with the release of Letraset sheets containing Lorem Ipsum passages, ' +
    'and more recently with desktop publishing software like Aldus PageMaker ' +
    'including versions of Lorem Ipsum.',
  alignment,
  allowHtml,
  labelPosition,
  labelWidth,
  slot
}: ArgTypes) => html`
  <uid-text
    alignment=${ifDefined(alignment)}
    lang=${ifDefined(lang)}
    id=${ifDefined(id)}
    label=${ifDefined(label)}
    text=${ifDefined(text)}
    label-position=${ifDefined(labelPosition)}
    label-width=${ifDefined(labelWidth)}
    ?allow-html=${allowHtml}
    ?label-hidden=${labelHidden}
  >
    ${slot}
  </uid-text>
`;

export const Regular = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  labelHidden: false,
};

export const WithHtml = Template.bind({});
WithHtml.args = {
  text: 'A text which <br> allow <b>HTML</b>.',
};

export const French = Template.bind({});
French.args = {
  lang: 'fr',
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};

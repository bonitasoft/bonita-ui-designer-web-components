import {html, TemplateResult} from 'lit';
import '../src/uid-title.js';
import {ifDefined} from 'lit-html/directives/if-defined.js'; // eslint-disable-line

export default {
  title: 'UidTitle',
  component: 'uid-title',
  argTypes: {
    localization: {control: 'text'},
    id: {control: 'text'},
    text: {control: 'text'},
    level: {
      options: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6'],
      control: 'select',
    },
    alignment: {
      options: ['left', 'center', 'right'],
      control: 'select'
    },
    allowHtml: {control: 'boolean'}
  },
};

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  localization?: string;
  id?: string;
  text?: string;
  alignment?: string;
  level?: string;
  allowHtml: boolean
}

const Template: Story<ArgTypes> = ({id, alignment, level, text = "My title", allowHtml = false}: ArgTypes) => html`
  <uid-title
    id=${ifDefined(id)}
    alignment=${ifDefined(alignment)}
    text=${ifDefined(text)}
    level=${ifDefined(level)}
    ?allow-html=${allowHtml}
  >
  </uid-title>
`;

export const Regular = Template.bind({});

export const alignmentLeft = Template.bind({});
alignmentLeft.args = {
  alignment: 'left',
};

export const alignmentCenter = Template.bind({});
alignmentCenter.args = {
  alignment: 'center',
};

export const alignmentRight = Template.bind({});
alignmentRight.args = {
  alignment: 'right',
};

export const withAllowHtml = Template.bind({});
withAllowHtml.args = {
  allowHtml: true,
  text: '<i>Toto</i>'
};


export const Level2 = Template.bind({});
Level2.args = {
  level: 'Level 2',
};
export const Leve3 = Template.bind({ level: 'Level 3'});

export const Level6 = Template.bind({});
Level6.args = {
  level: 'Level 6',
};

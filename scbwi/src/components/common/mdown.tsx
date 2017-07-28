import * as React from 'react';

const ReactMarkdown: any = require('react-markdown');

export const MDown = ({ text }: { text: string; }): JSX.Element => <ReactMarkdown escapeHtml={true} source={text} />;
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { request, gql } from 'graphql-request';

const URL = 'https://rickandmortyapi.graphcdn.app/';

const Editor = () => {
  const { t } = useTranslation('common');
  const [editValue, setEditValue] = useState('');

  const handleChange = (e: string) => {
    setEditValue(e);
  };

  const handleClick = () => {
    const query = gql`
      ${editValue}
    `;

    request(URL, query).then((data) => console.log(data));
  };

  return (
    <div className="editor__wrapper">
      <Tooltip placement="bottom" title={t('query')}>
        <FontAwesomeIcon
          icon={faCirclePlay}
          className="editor__svg"
          onClick={handleClick}
        />
      </Tooltip>
      <div className="editor__button">
        <Button danger>Docs</Button>
        <Button danger>Schema</Button>
      </div>
      <CodeMirror
        className="editor__code"
        height="100%"
        extensions={[javascript({ jsx: true })]}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Editor;

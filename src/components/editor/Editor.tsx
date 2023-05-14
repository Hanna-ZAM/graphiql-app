import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const Editor = () => {
  const { t } = useTranslation('common');

  return (
    <div className="editor__wrapper">
      <Tooltip placement="bottom" title={t('query')}>
        <FontAwesomeIcon icon={faCirclePlay} className="editor__svg" />
      </Tooltip>
      <div className="editor__button">
        <Button danger>Docs</Button>
        <Button danger>Schema</Button>
      </div>
      <CodeMirror
        className="editor__code"
        height="100%"
        extensions={[javascript({ jsx: true })]}
      />
    </div>
  );
};

export default Editor;

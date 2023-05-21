import CodeMirror from '@uiw/react-codemirror';
import { solarizedLight } from '@uiw/codemirror-themes-all';
import { javascript } from '@codemirror/lang-javascript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'next-i18next';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import {
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
  IntrospectionQuery
} from 'graphql';
import Aside from './Aside';
import { IError } from '@/types';

const endpoint = 'https://rickandmortyapi.com/graphql';

const Editor = () => {
  const { t } = useTranslation('common');
  const [openDocs, setOpenDocs] = useState(false);
  const [openSchema, setOpenSchema] = useState(false);
  const [schema, setSchema] = useState('');
  const [docs, setDocs] = useState('');
  const [query, setQuery] = useState('');
  const [code, setCode] = useState('');

  const showDocs = () => {
    setOpenDocs(true);
  };
  const showSchema = () => {
    setOpenSchema(true);
  };

  const onCloseDocs = () => {
    setOpenDocs(false);
  };
  const onCloseSchema = () => {
    setOpenSchema(false);
  };

  const handleChange = (text: string) => {
    setQuery(text);
  };
  const handleClick = () => {
    if (query) {
      setCode('');
      const gqlQuery = gql`
        ${query}
      `;

      (async () => {
        try {
          const result = await request(endpoint, gqlQuery);
          setCode(JSON.stringify(result, null, 2));
        } catch (error) {
          if (error instanceof Error) {
            if (error.message.includes('Network request failed')) {
              const requestAnswer = {
                error: 'Failed to fetch. Please check your connection'
              };
              setCode(JSON.stringify(requestAnswer, null, 2));
            } else {
              const e = error as unknown as IError;
              const requestAnswer = { errors: e.response.errors };
              setCode(JSON.stringify(requestAnswer, null, 2));
            }
          } else {
            setCode('Unknown error');
          }
        }
      })();
    }
  };

  useEffect(() => {
    (async () => {
      const introspectionQuery = getIntrospectionQuery();
      try {
        const introspectionResult = await request<IntrospectionQuery>(
          endpoint,
          introspectionQuery
        );
        const clientSchema = buildClientSchema(introspectionResult);
        const printedSchema = printSchema(clientSchema);
        const data = printedSchema
          .replace(/\n\s*\n/gs, '')
          .replace(/""".*?"""/gs, '')
          .replace(/{\n\s*\n/g, '{\n')
          .replace(/}/g, '}\n')
          .replace(/INTERFACE/g, 'INTERFACE\n');
        setSchema(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
        <Button danger onClick={showDocs}>
          {t('docs')}
        </Button>
        <Aside
          isOpen={openDocs}
          onClose={onCloseDocs}
          title="docs"
          data={docs}
        />
        <Button danger onClick={showSchema}>
          {t('schema')}
        </Button>
        <Aside
          isOpen={openSchema}
          onClose={onCloseSchema}
          title="schema"
          data={schema}
        />
      </div>
      <CodeMirror
        className="editor__code"
        height="100%"
        theme={solarizedLight}
        extensions={[javascript({ jsx: true })]}
        onChange={(text) => handleChange(text)}
        placeholder="# Write your query or mutation here"
      />
      <CodeMirror
        className="editor__code"
        height="100%"
        theme={solarizedLight}
        extensions={[javascript({ jsx: true })]}
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false
        }}
        value={code}
        readOnly
      />
    </div>
  );
};

export default Editor;

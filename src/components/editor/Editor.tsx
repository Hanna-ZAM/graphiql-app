import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'next-i18next';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { request, gql } from 'graphql-request';
import Docs from './Docs';
import Schema from './Shema';

const endpointURL = 'https://rickandmortyapi.com/graphql';
const introspectionQuery = `
  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Editor = () => {
  const { t } = useTranslation('common');
  const [openDocs, setOpenDocs] = useState(false);
  const [openSchema, setOpenSchema] = useState(false);
  const [docs, setDocs] = useState('');

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

  request(endpointURL, introspectionQuery).then((response) => {
    setDocs(JSON.stringify(response, null, '\t'));
  });

  return (
    <div className="editor__wrapper">
      <Tooltip placement="bottom" title={t('query')}>
        <FontAwesomeIcon
          icon={faCirclePlay}
          className="editor__svg"
          // onClick={handleClick}
        />
      </Tooltip>
      <div className="editor__button">
        <Button danger onClick={showDocs}>
          {t('docs')}
        </Button>
        <Docs isOpen={openDocs} onClose={onCloseDocs} docs={docs} />
        <Button danger onClick={showSchema}>
          {t('schema')}
        </Button>
        <Schema isOpen={openSchema} onClose={onCloseSchema} />
      </div>
      <CodeMirror
        className="editor__code"
        height="100%"
        extensions={[javascript({ jsx: true })]}
        // onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Editor;

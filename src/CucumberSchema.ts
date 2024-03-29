import { SchemaObject } from 'ajv'
export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/CucumberJson',
  definitions: {
    CucumberJson: {
      type: 'object',
      properties: {
        implementation: {
          type: 'string',
        },
        features: {
          type: 'array',
          items: {
            $ref: '#/definitions/Feature',
          },
        },
      },
      required: ['implementation', 'features'],
      additionalProperties: false,
    },
    Feature: {
      type: 'object',
      properties: {
        uri: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
        keyword: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        elements: {
          type: 'array',
          items: {
            $ref: '#/definitions/Element',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/Tag',
          },
        },
      },
      required: ['uri', 'keyword', 'name', 'elements'],
      additionalProperties: false,
    },
    Element: {
      type: 'object',
      properties: {
        start_timestamp: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
        id: {
          type: 'string',
        },
        type: {
          $ref: '#/definitions/ElementType',
        },
        keyword: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        before: {
          type: 'array',
          items: {
            $ref: '#/definitions/Hook',
          },
        },
        steps: {
          type: 'array',
          items: {
            $ref: '#/definitions/Step',
          },
        },
        after: {
          type: 'array',
          items: {
            $ref: '#/definitions/Hook',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/Tag',
          },
        },
      },
      required: ['line', 'type', 'keyword', 'name', 'description', 'steps'],
      additionalProperties: false,
    },
    ElementType: {
      type: 'string',
      enum: ['background', 'scenario'],
    },
    Hook: {
      type: 'object',
      properties: {
        match: {
          $ref: '#/definitions/Match',
        },
        result: {
          $ref: '#/definitions/Result',
        },
      },
      required: ['result'],
      additionalProperties: false,
    },
    Match: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
        },
        arguments: {
          type: 'array',
          items: {
            $ref: '#/definitions/Argument',
          },
        },
      },
      additionalProperties: false,
    },
    Argument: {
      type: 'object',
      properties: {
        value: {
          type: 'string',
        },
        offset: {
          type: 'number',
        },
      },
      required: ['value', 'offset'],
      additionalProperties: false,
    },
    Result: {
      type: 'object',
      properties: {
        duration: {
          type: 'number',
        },
        status: {
          $ref: '#/definitions/Status',
        },
        error_message: {
          type: 'string',
        },
      },
      required: ['status'],
      additionalProperties: false,
    },
    Status: {
      type: 'string',
      enum: ['passed', 'failed', 'skipped', 'undefined', 'pending', 'unknown'],
    },
    Step: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
        match: {
          $ref: '#/definitions/Match',
        },
        name: {
          type: 'string',
        },
        result: {
          $ref: '#/definitions/Result',
        },
        doc_string: {
          $ref: '#/definitions/DocString',
        },
        rows: {
          type: 'array',
          items: {
            $ref: '#/definitions/DataTableRow',
          },
        },
      },
      required: ['keyword', 'line', 'name', 'result'],
      additionalProperties: false,
    },
    DocString: {
      type: 'object',
      properties: {
        line: {
          type: 'number',
        },
        value: {
          type: 'string',
        },
        content_type: {
          type: 'string',
        },
      },
      required: ['line', 'value'],
      additionalProperties: false,
    },
    DataTableRow: {
      type: 'object',
      properties: {
        cells: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['cells'],
      additionalProperties: false,
    },
    Tag: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
} as SchemaObject

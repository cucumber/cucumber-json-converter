import { SchemaObject } from 'ajv'
export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/CucumberJvmJson',
  definitions: {
    CucumberJvmJson: {
      type: 'array',
      items: {
        $ref: '#/definitions/JvmFeature',
      },
    },
    JvmFeature: {
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
            $ref: '#/definitions/JvmElement',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/JvmLocationTag',
          },
        },
      },
      required: ['uri', 'id', 'line', 'keyword', 'name', 'description', 'elements'],
      additionalProperties: false,
    },
    JvmElement: {
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
          type: 'string',
          enum: ['background', 'scenario'],
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
        steps: {
          type: 'array',
          items: {
            $ref: '#/definitions/JvmStep',
          },
        },
        before: {
          type: 'array',
          items: {
            $ref: '#/definitions/JvmHook',
          },
        },
        after: {
          type: 'array',
          items: {
            $ref: '#/definitions/JvmHook',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/JvmTag',
          },
        },
      },
      required: ['line', 'type', 'keyword', 'name', 'description', 'steps'],
      additionalProperties: false,
    },
    JvmStep: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
        match: {
          $ref: '#/definitions/JvmMatch',
        },
        name: {
          type: 'string',
        },
        result: {
          $ref: '#/definitions/JvmResult',
        },
        doc_string: {
          $ref: '#/definitions/JvmDocString',
        },
        rows: {
          type: 'array',
          items: {
            $ref: '#/definitions/JvmDataTableRow',
          },
        },
      },
      required: ['keyword', 'line', 'name', 'result'],
      additionalProperties: false,
    },
    JvmMatch: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
        },
        arguments: {
          type: 'array',
          items: {
            $ref: '#/definitions/JvmArgument',
          },
        },
      },
      additionalProperties: false,
    },
    JvmArgument: {
      type: 'object',
      properties: {
        val: {
          type: 'string',
        },
        offset: {
          type: 'number',
        },
      },
      required: ['val', 'offset'],
      additionalProperties: false,
    },
    JvmResult: {
      type: 'object',
      properties: {
        duration: {
          type: 'number',
        },
        status: {
          $ref: '#/definitions/JvmStatus',
        },
        error_message: {
          type: 'string',
        },
      },
      required: ['status'],
      additionalProperties: false,
    },
    JvmStatus: {
      type: 'string',
      enum: ['passed', 'failed', 'skipped', 'undefined', 'pending'],
    },
    JvmDocString: {
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
    JvmDataTableRow: {
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
    JvmHook: {
      type: 'object',
      properties: {
        match: {
          $ref: '#/definitions/JvmMatch',
        },
        result: {
          $ref: '#/definitions/JvmResult',
        },
      },
      required: ['match', 'result'],
      additionalProperties: false,
    },
    JvmTag: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
      required: ['name'],
      additionalProperties: false,
    },
    JvmLocationTag: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        location: {
          $ref: '#/definitions/JvmLocation',
        },
      },
      required: ['name', 'type', 'location'],
      additionalProperties: false,
    },
    JvmLocation: {
      type: 'object',
      properties: {
        line: {
          type: 'number',
        },
        column: {
          type: 'number',
        },
      },
      required: ['line', 'column'],
      additionalProperties: false,
    },
  },
} as SchemaObject

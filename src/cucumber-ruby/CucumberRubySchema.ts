import { SchemaObject } from 'ajv'
export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/CucumberRubyJson',
  definitions: {
    CucumberRubyJson: {
      type: 'array',
      items: {
        $ref: '#/definitions/RubyFeature',
      },
    },
    RubyFeature: {
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
            $ref: '#/definitions/RubyElement',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyTag',
          },
        },
      },
      required: ['uri', 'id', 'line', 'keyword', 'name', 'description', 'elements'],
      additionalProperties: false,
    },
    RubyElement: {
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
          enum: ['background', 'scenario', 'scenario_outline'],
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
            $ref: '#/definitions/RubyStep',
          },
        },
        before: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyHook',
          },
        },
        after: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyHook',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyTag',
          },
        },
        examples: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyExamples',
          },
        },
      },
      required: ['line', 'type', 'keyword', 'name', 'description', 'steps'],
      additionalProperties: false,
    },
    RubyStep: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
        match: {
          $ref: '#/definitions/RubyMatch',
        },
        name: {
          type: 'string',
        },
        result: {
          $ref: '#/definitions/RubyResult',
        },
        doc_string: {
          $ref: '#/definitions/RubyDocString',
        },
        rows: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyDataTableRow',
          },
        },
        after: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyHook',
          },
        },
      },
      required: ['keyword', 'line', 'name'],
      additionalProperties: false,
    },
    RubyMatch: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
        },
        arguments: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyArgument',
          },
        },
      },
      additionalProperties: false,
    },
    RubyArgument: {
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
    RubyResult: {
      type: 'object',
      properties: {
        duration: {
          type: 'number',
        },
        status: {
          $ref: '#/definitions/RubyStatus',
        },
        error_message: {
          type: 'string',
        },
      },
      required: ['status'],
      additionalProperties: false,
    },
    RubyStatus: {
      type: 'string',
      enum: ['passed', 'failed', 'skipped', 'undefined', 'pending'],
    },
    RubyDocString: {
      type: 'object',
      properties: {
        value: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
        content_type: {
          type: 'string',
        },
      },
      required: ['value', 'line'],
      additionalProperties: false,
    },
    RubyDataTableRow: {
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
    RubyHook: {
      type: 'object',
      properties: {
        match: {
          $ref: '#/definitions/RubyMatch',
        },
        result: {
          $ref: '#/definitions/RubyResult',
        },
      },
      required: ['match', 'result'],
      additionalProperties: false,
    },
    RubyTag: {
      type: 'object',
      properties: {
        line: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
      },
      required: ['line', 'name'],
      additionalProperties: false,
    },
    RubyExamples: {
      type: 'object',
      properties: {
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
        rows: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyExamplesTableRow',
          },
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/RubyTag',
          },
        },
      },
      required: ['id', 'line', 'keyword', 'name', 'description', 'rows'],
      additionalProperties: false,
    },
    RubyExamplesTableRow: {
      type: 'object',
      properties: {
        cells: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        id: {
          type: 'string',
        },
        line: {
          type: 'number',
        },
      },
      required: ['cells', 'id', 'line'],
      additionalProperties: false,
    },
  },
} as SchemaObject

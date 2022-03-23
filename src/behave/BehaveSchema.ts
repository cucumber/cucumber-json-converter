import { SchemaObject } from 'ajv'
export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/BehaveJson',
  definitions: {
    BehaveJson: {
      type: 'array',
      items: {
        $ref: '#/definitions/Feature',
      },
    },
    Feature: {
      type: 'object',
      properties: {
        status: {
          $ref: '#/definitions/Status',
        },
        location: {
          type: 'string',
        },
        keyword: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'array',
          items: {
            type: 'string',
          },
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
            type: 'string',
          },
        },
      },
      required: ['status', 'location', 'keyword', 'name', 'elements', 'tags'],
      additionalProperties: false,
    },
    Status: {
      type: 'string',
      enum: ['passed', 'failed', 'skipped', 'undefined'],
    },
    Element: {
      type: 'object',
      properties: {
        steps: {
          type: 'array',
          items: {
            $ref: '#/definitions/Step',
          },
        },
        type: {
          type: 'string',
          enum: ['background', 'scenario'],
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        keyword: {
          type: 'string',
        },
        location: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        status: {
          $ref: '#/definitions/Status',
        },
      },
      required: ['steps', 'type', 'name', 'keyword', 'location'],
      additionalProperties: false,
    },
    Step: {
      type: 'object',
      properties: {
        step_type: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        keyword: {
          type: 'string',
        },
        location: {
          type: 'string',
        },
        result: {
          $ref: '#/definitions/Result',
        },
        match: {
          $ref: '#/definitions/Match',
        },
        table: {
          $ref: '#/definitions/Table',
        },
        text: {
          type: 'string',
        },
      },
      required: ['step_type', 'name', 'keyword', 'location'],
      additionalProperties: false,
    },
    Result: {
      type: 'object',
      properties: {
        status: {
          $ref: '#/definitions/Status',
        },
        duration: {
          type: 'number',
        },
        error_message: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['status', 'duration'],
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
      required: ['location', 'arguments'],
      additionalProperties: false,
    },
    Argument: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        value: {},
        original: {
          type: 'string',
        },
      },
      required: ['name', 'value', 'original'],
      additionalProperties: false,
    },
    Table: {
      type: 'object',
      properties: {
        rows: {
          type: 'array',
          items: {
            $ref: '#/definitions/Row',
          },
        },
      },
      required: ['rows'],
      additionalProperties: false,
    },
    Row: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
} as SchemaObject

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonValue } from '../../../../../../../core/models/project-docs.models';

interface SchemaProperty {
  type?: string;
  format?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
}

interface SchemaDefinition {
  properties?: Record<string, SchemaProperty>;
  required?: string[];
}

@Component({
  selector: 'app-schema-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schema-visualizer.html',
})
export class SchemaVisualizer {
  @Input() schema: JsonValue | SchemaDefinition | null = null;
  title = 'Schema';

  getPropertyKeys(): string[] {
    return Object.keys(this.getSchemaDefinition().properties ?? {});
  }

  getPropertyType(key: string): string {
    return this.getSchemaDefinition().properties?.[key]?.type || 'any';
  }

  isRequired(key: string): boolean {
    return this.getSchemaDefinition().required?.includes(key) || false;
  }

  getPropertyDescription(key: string): string {
    const prop = this.getSchemaDefinition().properties?.[key];
    const parts: string[] = [];

    if (prop?.format) parts.push(`Format: ${prop.format}`);
    if (prop?.minLength) parts.push(`Min length: ${prop.minLength}`);
    if (prop?.maxLength) parts.push(`Max length: ${prop.maxLength}`);
    if (prop?.minimum) parts.push(`Min: ${prop.minimum}`);
    if (prop?.maximum) parts.push(`Max: ${prop.maximum}`);

    return parts.join(', ');
  }

  private getSchemaDefinition(): SchemaDefinition {
    if (this.schema && typeof this.schema === 'object' && !Array.isArray(this.schema)) {
      return this.schema as SchemaDefinition;
    }

    return {};
  }
}

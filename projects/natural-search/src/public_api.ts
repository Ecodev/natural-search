/*
 * Public API Surface of natural-search
 */
export { NaturalDropdownData } from './lib/dropdown-container/dropdown.service';
export { FilterGroupConditionField, Filter } from './lib/classes/graphql-doctrine.types';
export { DropdownComponent } from './lib/types/DropdownComponent';
export { ItemConfiguration, NaturalSearchConfiguration } from './lib/types/Configuration';
export { NaturalSearchSelections, Selection } from './lib/types/Values';
export { NaturalDropdownRef } from './lib/dropdown-container/dropdown-ref';
export { NATURAL_DROPDOWN_DATA } from './lib/dropdown-container/dropdown.service';
export { TypeNumericComponent } from './lib/dropdown-components/type-numeric/type-numeric.component';
export { TypeDateRangeComponent } from './lib/dropdown-components/type-date-range/type-date-range.component';
export { TypeNumericRangeComponent } from './lib/dropdown-components/type-numeric-range/type-numeric-range.component';
export { TypeSelectComponent } from './lib/dropdown-components/type-select/type-select.component';
export { NaturalSearchModule } from './lib/natural-search.module';
export { toGraphQLDoctrineFilter } from './lib/classes/graphql-doctrine';
export { fromUrl, toUrl } from './lib/classes/url';

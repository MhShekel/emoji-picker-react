import * as React from 'react';
import './CategoryNavigation.css';
import clsx from 'clsx';
import { useActiveCategoryState } from '../context/PickerContext';
import { categoryFromCategoryConfig } from '../../config/categoryConfig';
import { useCategoriesConfig } from '../../config/useConfig';

export function CategoryNavigation() {
  const categoriesConfig = useCategoriesConfig();
  const [
    activeCategory,
    ,
    setActiveCategoryAndScroll
  ] = useActiveCategoryState();
  return (
    <div className="epr-category-nav">
      {categoriesConfig.map(categoryConfig => {
        const category = categoryFromCategoryConfig(categoryConfig);
        return (
          <button
            className={clsx('epr-cat-btn', `epr-icn-${category}`, {
              active: category === activeCategory
            })}
            key={category}
            onClick={() => setActiveCategoryAndScroll(category)}
          />
        );
      })}
    </div>
  );
}

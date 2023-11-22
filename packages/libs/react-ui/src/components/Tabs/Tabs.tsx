import cn from 'classnames';
import type { ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';
import type { AriaTabListProps } from 'react-aria';
import { useTabList } from 'react-aria';
import { useTabListState } from 'react-stately';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import {
  selectorLine,
  tabListClass,
  tabListClass2,
  tabsContainerClass,
} from './Tabs.css';

export { Item as TabItem } from 'react-stately';

export interface ITabsProps
  extends Omit<AriaTabListProps<object>, 'orientation' | 'items'> {
  className?: string;
}

export const Tabs = ({ className, ...props }: ITabsProps): ReactNode => {
  const state = useTabListState(props);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { tabListProps } = useTabList(
    { ...props, orientation: 'horizontal' },
    state,
    containerRef,
  );

  const selectedUnderlineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !selectedUnderlineRef.current) {
      return;
    }

    let selected = containerRef.current.querySelector(
      '[data-selected="true"]',
    ) as HTMLElement;

    if (selected === undefined || selected === null) {
      selected = containerRef.current.querySelectorAll(
        'div[role="tab"]',
      )[0] as HTMLElement;
    }

    // set position of the bottom line
    selectedUnderlineRef.current.style.setProperty(
      'transform',
      `translateX(${selected.offsetLeft}px)`,
    );
    selectedUnderlineRef.current.style.setProperty(
      'width',
      `${selected.offsetWidth}px`,
    );
  }, [containerRef, state.selectedItem?.key, selectedUnderlineRef]);

  return (
    <div className={cn(tabsContainerClass, className)}>
      <div className={tabListClass} {...tabListProps} ref={containerRef}>
        {/* <div className={tabListClass2}> */}
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
        {/* </div> */}

        <span ref={selectedUnderlineRef} className={selectorLine}></span>
      </div>
      {/* <span ref={selectedUnderlineRef} className={selectorLine}></span> */}

      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
};

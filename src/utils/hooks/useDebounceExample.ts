import React from 'react';
import { ACTION_DELAY } from '../../../utils/constants/constants';
import debounce from 'lodash.debounce';
import { NavigateOptions } from 'react-router';
import { URLSearchParamsInit } from 'react-router-dom';
import { ContentInputsUpdater } from '../../../utils/interfaces&types';

const useTableContentChangeHandlers = (
  setSearchParams: (
    nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit) | undefined,
    navigateOpts?: NavigateOptions | undefined,
  ) => void,
  contentInputsUpdater: ContentInputsUpdater,
  // contentInputReset: (activeInput: string) => void,
) => {
  const settingSearchParams = React.useCallback(
    (condition: boolean, key: string, value: string) => {
      if (condition) {
        setSearchParams({});
      } else {
        setSearchParams({ [key]: value });
      }
      // contentInputReset(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSearchParams],
  );

  const debounceSettingSearchParams = React.useMemo(() => {
    return debounce(settingSearchParams, ACTION_DELAY);
  }, [settingSearchParams]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;
    const condition = value.length === 0;
    const idToKeyMap: { [key: string]: string } = {
      Product: 'legacyProductId',
      Title: 'searchTitleBy',
      Content: 'searchContentBy',
      SearchBy: 'searchBy',
    };
    const key = idToKeyMap[id];

    const idToUpdaterMap: { [key: string]: (value: string) => void } = {
      // Product: contentInputsUpdater.product,
      // Title: contentInputsUpdater.title,
      // Content: contentInputsUpdater.content,
      SearchBy: contentInputsUpdater.searchBy,
    };
    const updaterFunction = idToUpdaterMap[id];
    updaterFunction(value);

    debounceSettingSearchParams(condition, key, value);
  };
  return handleInputChange;
};

export default useTableContentChangeHandlers;

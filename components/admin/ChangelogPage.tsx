
import React from 'react';
import { MOCK_CHANGELOG } from '../../data/changelog';
import { ChangelogItemType } from '../../types';
import { ChangelogIcon } from '../icons';

const BADGE_COLORS: Record<ChangelogItemType, string> = {
  feature: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  improvement: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  fix: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const ChangelogPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Platform Changelog</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track all the latest features, improvements, and bug fixes.
        </p>
      </div>

      <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4">
        {MOCK_CHANGELOG.map((entry) => (
          <div key={entry.version} className="mb-10 ml-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full -left-4 ring-4 ring-background-light dark:ring-background-dark text-primary">
              <ChangelogIcon />
            </span>
            <div className="p-4 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Version {entry.version}
                </span>
                <time className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {entry.date}
                </time>
              </div>
              <ul className="space-y-3">
                {entry.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span
                      className={`text-xs font-semibold inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline rounded-full ${BADGE_COLORS[item.type]}`}
                    >
                      {item.type}
                    </span>
                    <p className="text-base font-normal text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangelogPage;
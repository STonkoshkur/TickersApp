import React, { Fragment, memo } from 'react';

// Components
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// Layout
import { Measurements } from 'src/layout';

const itemsToRender = ['row1', 'row2', 'row3'];

const StockCompanySkeleton = () => {
  return (
    <SkeletonPlaceholder>
      {/* Header section */}
      <SkeletonPlaceholder.Item width={140} height={26} borderRadius={4} />
      <SkeletonPlaceholder.Item
        width={120}
        height={30}
        borderRadius={4}
        marginVertical={10}
      />
      <SkeletonPlaceholder.Item width={140} height={26} borderRadius={4} />

      {/* Chart section */}
      <SkeletonPlaceholder.Item
        width={'100%'}
        height={150}
        borderRadius={4}
        marginVertical={Measurements.double}
      />

      {/* Contact info and Description sections */}
      <>
        {['contacts', 'description'].map((key) => (
          <SkeletonPlaceholder.Item
            key={key}
            marginVertical={Measurements.double}>
            <SkeletonPlaceholder.Item
              width={120}
              height={26}
              borderRadius={4}
              marginBottom={Measurements.medium}
            />
            <>
              {itemsToRender.map((item) => (
                <SkeletonPlaceholder.Item
                  key={item}
                  width="100%"
                  height={24}
                  borderRadius={4}
                  marginBottom={Measurements.tiny}
                />
              ))}
            </>

            {/* Show map section */}
            {key === 'contacts' ? (
              <SkeletonPlaceholder.Item
                key={key}
                width="100%"
                aspectRatio={16 / 9}
                marginTop={20}
                borderRadius={4}
                marginRight={Measurements.medium}
              />
            ) : (
              //  Child is required to be the 'Element' type
              // 'null' or 'boolean' values can cause app crash
              <Fragment />
            )}
          </SkeletonPlaceholder.Item>
        ))}
      </>

      {/* Tags and Related stocks sections */}
      <>
        {['tags', 'relatedStocks'].map((key) => (
          <SkeletonPlaceholder.Item
            key={key}
            marginVertical={Measurements.double}>
            <SkeletonPlaceholder.Item
              width={120}
              height={26}
              borderRadius={4}
              marginBottom={Measurements.medium}
            />
            <SkeletonPlaceholder.Item flexDirection="row">
              {itemsToRender.map((item) => (
                <SkeletonPlaceholder.Item
                  key={item}
                  width={100}
                  height={26}
                  borderRadius={4}
                  marginRight={Measurements.medium}
                />
              ))}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </>
    </SkeletonPlaceholder>
  );
};

export default memo(StockCompanySkeleton);

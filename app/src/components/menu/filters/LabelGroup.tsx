import React, {useMemo} from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import {LabelCheckbox} from './LabelCheckbox';
import {FilterHeader} from './FilterHeader';
import {Splitter} from '../../common/Splitter';

const StyledContainer = styled.View`
  margin-top: 8px;
  margin-right: -30px;
`;

const StyledFlex = styled.View`
  flex-direction: row;
  margin-right: 31px;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLabel = styled(LabelCheckbox)`
  margin-right: 7.5px;
  margin-left: 7.5px;
  margin-bottom: 13px;
`;

const StyledSplitter = styled(Splitter)`
  margin-top: 17px;
  border-radius: 1.5px;
`;

export const LabelGroup = ({
  header,
  labels,
  selected,
  onAdd,
  onRemove,
}: {
  header: string;
  labels: string[];
  selected: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
}) => {
  const hasContent = useMemo(() => labels.length !== 0, [labels.length]);

  return hasContent ? (
    <>
      <View>
        <FilterHeader value={header} />
        <StyledContainer>
          <StyledFlex>
            {labels?.map(c => (
              <StyledLabel
                key={c}
                label={c}
                selected={selected.includes(c)}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            ))}
          </StyledFlex>
        </StyledContainer>
      </View>
      <StyledSplitter />
    </>
  ) : null;
};

import styled from "styled-components"
import { StyledLabel } from "../../common/Label"
import React, { useState } from "react"
import { FormikCheckboxWithName } from "../../common/formik/FormikCheckboxWithName"
import { useField } from "formik"
import { SketchPicker } from "react-color"
import {
  getLblChefRecommend,
  getLblColorBorder,
  getLblTopOfTheWeek,
  getMsgAdditionalCategory,
  getMsgBorder,
  getMsgMarketingTools,
  getMsgMarketingToolsInfo,
} from "../../../../messages/dishes"
import { Checkbox } from "../../common/input/Checkbox"
import { DiscountIcon } from "../../icons/DiscountIcon"
import { StarIcon } from "../../icons/StarIcon"
import { ChefIcon2 } from "../../icons/ChefIcon2"
import { Sticker } from "../../../../definitions/Sticker"
import { FormikCheckBox } from "../../common/formik/FormikCheckbox"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.375rem;

  h2 {
    margin: 0 0 0.625rem;
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 2.125rem;
  }

  span {
    color: #828282;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
  }
`

const StyledGroup = styled.div`
  display: flex;
  gap: 1.375rem;
  position: relative;

  :last-child {
    justify-content: space-between;
  }
`

const StyleStickersGroup = styled(StyledGroup)`
  flex-direction: column;
  gap: 1.375rem;
  justify-content: flex-start !important;
`

const StyledStickerContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.25rem;
  }
`

const StyledColorBtn = styled.div<{
  color?: string
}>`
  width: 12.125rem;
  height: 1.75rem;
  background-color: ${(v) => v.color ?? "black"};
  border-radius: 0.3125rem;
  cursor: pointer;
`

const StyledColorPickerContainer = styled.div`
  left: 4rem;
  top: -10rem;
  position: absolute;
  z-index: 1;
`

const ColorBorderInput = () => {
  const [pickedOpen, setPickedOpen] = useState(false)
  const [colorField, _, helpers] = useField("color")

  return (
    <StyledGroup>
      <FormikCheckBox id={"color-border-input"} name={"colorBorder"} label={getLblColorBorder()} />
      <StyledColorBtn color={colorField.value} onClick={() => setPickedOpen((v) => !v)} />
      <StyledColorPickerContainer>
        {pickedOpen && (
          <SketchPicker
            disableAlpha
            color={{ hex: colorField.value } as any}
            onChange={(v) => v && helpers.setValue(v.hex)}
          />
        )}
      </StyledColorPickerContainer>
    </StyledGroup>
  )
}

const StickerInput = () => {
  const [field, _, helpers] = useField("sticker")

  const handleChange = (v: string) => {
    if (v === field.value) helpers.setValue(null)
    else helpers.setValue(v)
  }

  return (
    <StyleStickersGroup>
      <Checkbox
        id={"discount-input"}
        name={"discount"}
        label={
          <StyledStickerContainer>
            <DiscountIcon />
            Discount
          </StyledStickerContainer>
        }
        checked={field.value === Sticker.Discount}
        onChange={() => handleChange(Sticker.Discount)}
      />

      <Checkbox
        id={"top-rated-input"}
        name={"top-rated"}
        label={
          <StyledStickerContainer>
            <ChefIcon2 />
            Top rated
          </StyledStickerContainer>
        }
        checked={field.value === Sticker.Chef}
        onChange={() => handleChange(Sticker.Chef)}
      />

      <Checkbox
        id={"chefs-choice-input"}
        name={"chefs-choice"}
        label={
          <StyledStickerContainer>
            <StarIcon />
            Chef's choice
          </StyledStickerContainer>
        }
        checked={field.value === Sticker.Star}
        onChange={() => handleChange(Sticker.Star)}
      />
    </StyleStickersGroup>
  )
}

export const MarketingToolsInput = () => {
  return (
    <StyledContainer>
      <div>
        <h2>{getMsgMarketingTools()}</h2>
        <span>{getMsgMarketingToolsInfo()}</span>
      </div>

      {/*<StyledLabel>{getMsgAdditionalCategory()}</StyledLabel>
      <StyledGroup>
        <FormikCheckBox id={"featured-input"} name={"featured"} label={getLblChefRecommend()} />
        <FormikCheckBox
          id={"top-of-the-week-input"}
          name={"topOfTheWeek"}
          label={getLblTopOfTheWeek()}
        />
      </StyledGroup>*/}

      <StyledLabel style={{ marginTop: "0.5rem" }}>{getMsgBorder()}</StyledLabel>
      <ColorBorderInput />

      <StyledLabel style={{ marginTop: "0.5rem" }}>Sticker</StyledLabel>
      <StickerInput />
    </StyledContainer>
  )
}

import React from 'react'
import PropTypes from 'prop-types';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import Icons from "../../resources/Icons";
import {AppColors} from "../../resources/AppColors";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    select: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,

            },
        },
        "& .MuiInputBase-root": {
            color: AppColors.WHITE,

        },
        "& .MuiInputLabel-root": {
            color: AppColors.WHITE,
            backgroundColor: "transparent"

        },
        "&:before": {
            color: AppColors.WHITE,
        },
        "&:after": {
            borderBottomColor: AppColors.WHITE,
        },
        "& .MuiSvgIcon-root": {
            color: AppColors.PRIMARY,
        },
        color: AppColors.WHITE,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
    },
}));

const SelectGeekify = ({value, handleChange, options, label, borderRadius, width, textRender}) => {
    const classes = useStyles();
    console.log(options)
    return (
        <FormControl data-testid={"formControl"} className={classes.select} variant="outlined" margin='normal'
                     style={{width: '15em'}}>
            <InputLabel data-testid={"inputLabel"} className={classes.select}
                        id="demo-simple-select-label">{label}</InputLabel>
            <Select data-testid={"selectGeekify"} className={classes.select} IconComponent={Icons.ARROW_DOWN}
                    value={value}
                    onChange={handleChange}
                    label={label}
                    style={{width: {width}, borderRadius: {borderRadius}}}
                    renderValue={value !== undefined ? undefined : () => `${textRender}`}

            >
                {options.map(item =>
                    (
                        <MenuItem data-testid={"menuItem"} key={item.id} style={{color: AppColors.PRIMARY}}
                                  value={item.id}>{item.value.title}</MenuItem>

                    )
                )}
            </Select>
        </FormControl>
    )
}

SelectGeekify.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool, PropTypes.number]).isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
}

export default SelectGeekify

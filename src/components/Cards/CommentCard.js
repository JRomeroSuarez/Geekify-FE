import React from "react";
import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {AppColors} from "../../resources/AppColors";
import FavoriteIcon from '@mui/icons-material/Favorite';

/**
 * Component to create comment cards.
 *
 * @component
 *
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {object} props.style: style of the card
 *
 * @example
 * const children = <CardGeekify.Body> ... </CardGeekify.Body>;
 * const bg = 'light';
 * const style = {height: '18rem', width: '18rem'};
 *
 * <CommentCard bg={bg} style={style}> {children} </CardGeekify>
 */
const CommentCard = props => {
    const {children, bg, height, width, title, time, comment} = props;
    return (
        <Card
            data-testid={"commentCard"}
            className="w-100 mb-3"
            style={{
                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                borderRadius: 10,
                height: height,
                width: width,
                backgroundColor: bg,
                color: AppColors.PRIMARY
            }
            }>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: AppColors.RED}} aria-label="recipe">
                        <img style={{width: '40px', height: '40px'}} src={comment.image_user}/>

                    </Avatar>
                }

                title={<Typography style={{fontSize: '20px', color: AppColors.PRIMARY}}>{comment.user}</Typography>}
                subheader={<Typography style={{fontSize: '16px', color: AppColors.GRAY}}>{comment.date}</Typography>}
            />

            <CardContent>
                <Typography style={{fontSize: '16px', color: AppColors.WHITE}}>
                    {comment.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>

            </CardActions>
        </Card>
    )
}

CommentCard.propTypes = {
    children: PropTypes.array.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.string,
    comment: PropTypes.string,
}

CommentCard.defaultProps = {
    bg: AppColors.WHITE
};

export default CommentCard;

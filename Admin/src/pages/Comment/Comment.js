import React from 'react';
import * as StringConstant from './../String';
import {Avatar} from "@material-ui/core";
class Comment extends React.Component {

    render() {
        return (
           
               <table>
                            <td  style={{paddingBottom:0, marginBottom:0}}>
                            <Avatar 
                                src={StringConstant.IMAGE_PATH + this.props.comment.avatar}>
                            </Avatar>
                            </td>
                            <td style={{paddingLeft: 30, marginBottom:0}}>
                            {this.props.comment.comment}
                            </td>
               </table>
                            

           
        )
    }
}
export default Comment;
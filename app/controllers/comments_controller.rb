class CommentsController < ApplicationController

  #POST /boards/:board_id/comments
  def create
    @board = Board.find(params[:board_id])
    @comment = @board.comments.create(comment_params)

    logger.debug "@board"
    logger.debug "params"
    #redirect_to board_path(@board)
    redirect_to "/boards#index"
  end

  #DELETE /boards/:board_id/comments/:id
  def destroy
    @board = Board.find(params[:board_id])
    @comment = @board.comments.find(params[:id])
    @comment.destroy

    redirect_to board_path(@board)
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end

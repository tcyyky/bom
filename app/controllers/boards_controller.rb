# coding: utf-8
class BoardsController < ApplicationController

	# GET /
	def index
		render
	end

	# GET /boards/getNearbyBoards/:lat/:lng
  # 周辺標識のAPI
	def getNearby
    c = Board.arel_table
    res = Board.where(c[:latitude].gt(30)
      .and(c[:latitude].lt(40))
      .and(c[:longitude].gt(135))
      .and(c[:longitude].lt(150)))
      .select(c[:id])
      .select(c[:back_type])
      .select(c[:latitude])
      .select(c[:longitude])
      .to_json    #TODO 数値の調整

    render :json => res
  end

  # GET /boards/:id
  # 標識詳細のAPI
  def show
  	c = Board.arel_table
    res = Board.find(params[:id]).to_json

  	render :json => res
  end


  # GET /boards/new
  def new
    @board = Board.new
  end

  # POST /boards
  def create
    @board = Board.new(params[board_params])
    @board.save
    redirect_to @board
  end

  private # モデルではなくコントローラでパラメータのフィルタリングをする．
  def board_params
    params.require(:board).permit(:image, :caption, :latitude, :longitude, :type, :good, :bad, :username, :remove_image, :image_cache) # マイグレーションファイルの確認をせよ．
  end

end

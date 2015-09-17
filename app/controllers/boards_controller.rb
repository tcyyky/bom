# coding: utf-8
class BoardsController < ApplicationController
  before_action :set_board, only: [:show, :edit, :update, :destroy]

	# GET /
	def index
    @boards = Board.all
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

  # # GET /boards/:id
  # # 標識詳細のAPI
  # def show
  # 	c = Board.arel_table
  #   res = Board.find(params[:id]).to_json

  # 	render :json => res
  # end

  # GET /users/:id
  # GET /users/:id.json
  def show

  end


  # GET /boards/new
  def new
    @board = Board.new
  end

  # GET /users/1/edit
  def edit

  end

  # POST /boards
  # POST /boards.json
  def create
    #@board = Board.new(params[:id])
    @board = Board.new(board_params)

    respond_to do |format|
      if @board.save
        format.html { redirect_to @board, notice: 'Board created' }
        format.json { render :show, status: :created, location: @board }
      else
        format.html { render :new }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /boards/:id
  # PATCH/PUT /boards/:id.json
  def update
    respond_to do |format|
      if @board.update(board_params)
        format.html { redirect_to @board, notice: 'Board updated' }
        format.json { render :show, status: :ok, location: @board }
      else
        format.html { render :edit }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end


  # DELETE /boards/:id
  # DELETE /boards/:id.json
  def destroy
    @board.destroy
    respond_to do |format|
      format.html { redirect_to boards_url, notice: 'Board destroyed' }
      format.json { head :no_content }
    end
  end

  private
  def set_board
    @board = Board.find(params[:id])
  end

  # モデルではなくコントローラでパラメータのフィルタリングをする．
  def board_params
    params.require(:board).permit(:caption, :latitude, :longitude, :back_type, :good, :bad, :image, :remove_image, :image_cache, :remote_image_url) # マイグレーションファイルの確認をせよ．:username は参照型なので，ここで指定するとerrorとなる．
  end
end

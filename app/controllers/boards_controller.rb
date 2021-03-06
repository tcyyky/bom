# coding: utf-8
class BoardsController < ApplicationController
  include CarrierwaveBase64Uploader
  before_action :set_board, only: [:show, :edit, :update, :destroy]

	# GET /
	def index
    @boards = Board.all
		@board = Board.new
    render
	end

	# GET /boards/getNearbyBoards/:lat/:lng
  # 周辺標識のAPI
	def getNearby
    c = Board.arel_table
    # res = Board.where(c[:latitude].gt(30)
    #                    .and(c[:latitude].lt(50))
    #                    .and(c[:longitude].gt(130))
    #                    .and(c[:longitude].lt(150)))
    #       .select(c[:id])
    #       .select(c[:back_type])
    #       .select(c[:latitude])
    #       .select(c[:longitude])
    #       .to_json
    res = Board.all.to_json

    render :json => res
  end

  # GET /boards/detail/:id
  # 標識詳細のAPI
  def detail
    c = Board.arel_table
    res = Board.find(params[:id]).to_json

    render :json => res
  end

  # GET /boards/:id
  # 標識詳細のAPI
  # def show
  # 	c = Board.arel_table
  #   res = Board.find(params[:id]).to_json

  # 	render :json => res
  # end

  # GET /boards/:id
  # GET /boards/:id.json
  def show
    # respond_to do |format|
    #   format.html
    #   format.json { render json: @board }
    # end

    # gem jbuilder を使う
    # http://railscasts.com/episodes/320-jbuilder?language=ja&view=asciicast
  end


  # GET /boards/sendFeedback/:id/:gb/:ud
  # Good と Badをインクリメント、デクリメントするAPI
  # (g => good, b => bad), (u => up, d => down)
  def sendFeedback
    if params[:gb] == 0
      if params[:ud] == 0
        Board.find(params[:id]).increment(:good).save
      elsif params[:ud] == 1
        Board.fill(params[:id]).decrement(:good).save
      end
    elsif params[:gb] == 1
      if params[:ud] == 0
        Board.find(params[:id]).increment(:bad).save
      elsif params[:ud] == 1
        Board.fill(params[:id]).decrement(:bad).save
      end
    end
  end


  # GET /boards/new/:lat/:lng
  def new
    @board = Board.new
    @lat = params[:lat]
    @lng = params[:lng]
  end

  # GET /users/1/edit
  def edit
  end

  # POST /boards
  # POST /boards.json
  # def create
  #   #@board = Board.new(params[:id])
  #   @board = Board.new(board_params)

  #   respond_to do |format|
  #     if @board.save
  #       format.html { redirect_to @board, notice: 'Board created' }
  #       format.json { render :show, status: :created, location: @board }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @board.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # POST /boards
  # POST /boards.json
  def create
    tmp_board_params = board_params
    image_data = base64_conversion(tmp_board_params[:remote_image_url])
    tmp_board_params[:image] = image_data
    tmp_board_params[:remote_image_url] = nil
    tmp_board_params[:good] = 0
    tmp_board_params[:bad] = 0

    @board = Board.new(tmp_board_params)

    respond_to do |format|
      if @board.save
        format.html { redirect_to @board, notice: 'Board created' }
        format.json { render :show, status: :created, location: @board }
      else
        format.html { render :new }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    # redirect_to edit_board_path(@board)
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
    params.require(:board).permit(:caption, :latitude, :longitude, :back_type, :good, :bad, :image, :remove_image, :image_cache, :remote_image_url) # マイグレーションファイルの確認をせよ．:user は userモデルへの参照型なので，ここで指定するとerrorとなる？
  end
end

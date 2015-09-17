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

  end

  # POST /boards
  def create
    render text: params[:board].inspect
  end

end

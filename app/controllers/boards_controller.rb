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

  # GET /boards/sendFeedback/:gb/:ud
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

  # GET /boards/new
  def new

  end

  # POST /boards
  def create
    render text: params[:board].inspect
  end

end

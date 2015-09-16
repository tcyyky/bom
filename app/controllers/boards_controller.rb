class BoardsController < ApplicationController

	# GET /
	def index
		render
	end

	# GET /boards/getNearbyBoards/:lat/:lng
	def getNearby
    #モデルが出来るまでとりあえずサンプル
    res = [
      {"id" => 1, "icon" => "/assets/minisign_b.png", "lat" => 36.091292, "lng" => 140.0955103}, #typeは 0 => blue, 1 => yellow, 2 => red
      {"id" => 2, "icon" => "/assets/minisign_r.png", "lat" => 36.091298, "lng" => 140.0957101}
    ]
    #TODO DBからparam[:lat] param[:lng]から±0.005くらいのマーカをとってみる

    render :json => res
  end

  # GET /boads/:id
  def show
  	# TODO DBに問い合わせ
  	if params[:id] == "1" then
	  	res = {"id" => 1, "imageUrl" => "http://freesozai.jp/sozai/roadsign/img/rds_049/1.png", "text" => "スピード出しすぎ注意", "good" => 2, "bad" => 1 }
	  else
	  	res = {"id" => 2, "imageUrl" => "http://freesozai.jp/sozai/roadsign/img/rds_056/1.png", "text" => "優先してね", "good" => 2, "bad" => 1 }
	  end

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

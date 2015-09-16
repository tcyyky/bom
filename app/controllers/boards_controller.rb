class BoardsController < ApplicationController

	# GET /
	def index
		render
	end

	# GET /boards/getNearbyBoards/:lat/:lng
	def getNearby
    #モデルが出来るまでとりあえずサンプル
    res = [
      {"id" => "nvcb429cblp2", "icon" => "/assets/minisign_b.png", "lat" => 36.091292, "lng" => 140.0957803}, #typeは 0 => blue, 1 => yellow, 2 => red
      {"id" => "4p3vq;c4pmp8", "icon" => "/assets/minisign_r.png", "lat" => 36.091298, "lng" => 140.0957101}
    ]
    #TODO DBからparam[:lat] param[:lng]から±0.005くらいのマーカをとってみる

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

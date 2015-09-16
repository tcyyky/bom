class SignesController < ApplicationController

  def index
    render
  end

  def getNearbySignes
    res = [
      { "icon" => "/assets/minisign_b.png", "lat" => 36.091292, "lng" => 140.0957803}, #typeは 0 => blue, 1 => yellow, 2 => red
      { "icon" => "/assets/minisign_r.png", "lat" => 36.091298, "lng" => 140.0957101}
    ]
    render :json => res
  end

end

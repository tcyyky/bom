class BoardsController < ApplicationController

  # GET /boards/new
  def new

  end

  # POST /boards
  def create
    render text: params[:board].inspect
  end

end

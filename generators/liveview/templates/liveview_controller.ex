defmodule <%= baseModule %>Web.<%= viewNamePascal %>Live do
  use <%= baseModule %>Web, :live_view

  @impl true
  @spec mount(any, any, Phoenix.LiveView.Socket.t()) :: {:ok, Phoenix.LiveView.Socket.t()}
  def mount(_, session, socket) do
    socket = socket |> assign_defaults(session)
    {:ok, socket}
  end

  @impl true
  def render(assigns) do
    Phoenix.View.render(<%= baseModule %>Web.<%= viewNamePascal %>View, "<%= viewNameSnake %>.html", assigns)
  end
end


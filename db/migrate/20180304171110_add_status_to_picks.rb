class AddStatusToPicks < ActiveRecord::Migration[5.1]
  def change
    add_column :picks, :status, :integer, default: 0, null: false
  end
end

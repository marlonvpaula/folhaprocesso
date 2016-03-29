# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160328223718) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "acessoriofolhas", force: true do |t|
    t.integer  "folhaprocesso_id"
    t.integer  "acessorio_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "acessoriofolhas", ["acessorio_id"], name: "index_acessoriofolhas_on_acessorio_id", using: :btree
  add_index "acessoriofolhas", ["folhaprocesso_id"], name: "index_acessoriofolhas_on_folhaprocesso_id", using: :btree

  create_table "acessorios", force: true do |t|
    t.string   "descricao"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comandofolhas", force: true do |t|
    t.integer  "folhaprocesso_id"
    t.integer  "comando_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comandofolhas", ["comando_id"], name: "index_comandofolhas_on_comando_id", using: :btree
  add_index "comandofolhas", ["folhaprocesso_id"], name: "index_comandofolhas_on_folhaprocesso_id", using: :btree

  create_table "comandos", force: true do |t|
    t.string   "descricao"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "desenhos", force: true do |t|
    t.string   "codigo"
    t.string   "titulo"
    t.integer  "modelo_id"
    t.integer  "grupomodelo_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "desenhos", ["grupomodelo_id"], name: "index_desenhos_on_grupomodelo_id", using: :btree
  add_index "desenhos", ["modelo_id"], name: "index_desenhos_on_modelo_id", using: :btree

  create_table "fabricantes", force: true do |t|
    t.string   "descricao"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ferramentafolhas", force: true do |t|
    t.integer  "folhaprocesso_id"
    t.integer  "suporte_id"
    t.integer  "inserto_id"
    t.integer  "fabricante_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "posicao"
    t.string   "altura"
  end

  add_index "ferramentafolhas", ["fabricante_id"], name: "index_ferramentafolhas_on_fabricante_id", using: :btree
  add_index "ferramentafolhas", ["folhaprocesso_id"], name: "index_ferramentafolhas_on_folhaprocesso_id", using: :btree
  add_index "ferramentafolhas", ["inserto_id"], name: "index_ferramentafolhas_on_inserto_id", using: :btree
  add_index "ferramentafolhas", ["suporte_id"], name: "index_ferramentafolhas_on_suporte_id", using: :btree

  create_table "folhaprocessos", force: true do |t|
    t.string   "nomepeca"
    t.date     "dtProjeto"
    t.date     "dtVerificacao"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "desenho_id"
    t.integer  "operacao_id"
    t.integer  "programador_id"
  end

  add_index "folhaprocessos", ["desenho_id"], name: "index_folhaprocessos_on_desenho_id", using: :btree
  add_index "folhaprocessos", ["operacao_id"], name: "index_folhaprocessos_on_operacao_id", using: :btree
  add_index "folhaprocessos", ["programador_id"], name: "index_folhaprocessos_on_programador_id", using: :btree

  create_table "grupomodelos", force: true do |t|
    t.string   "descricao"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "inserto_fabricantes", force: true do |t|
    t.integer  "fabricante_id"
    t.integer  "inserto_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "inserto_fabricantes", ["fabricante_id"], name: "index_inserto_fabricantes_on_fabricante_id", using: :btree
  add_index "inserto_fabricantes", ["inserto_id"], name: "index_inserto_fabricantes_on_inserto_id", using: :btree

  create_table "insertos", force: true do |t|
    t.string   "descricao"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "raio"
  end

  create_table "modelos", force: true do |t|
    t.string   "descricao"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "operacaos", force: true do |t|
    t.string   "descricao"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "programadors", force: true do |t|
    t.string   "nome"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "suporte_insertos", force: true do |t|
    t.integer  "suporte_id"
    t.integer  "inserto_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "suporte_insertos", ["inserto_id"], name: "index_suporte_insertos_on_inserto_id", using: :btree
  add_index "suporte_insertos", ["suporte_id"], name: "index_suporte_insertos_on_suporte_id", using: :btree

  create_table "suportes", force: true do |t|
    t.string   "descricao"
    t.integer  "operacao_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.string   "typeuser"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
